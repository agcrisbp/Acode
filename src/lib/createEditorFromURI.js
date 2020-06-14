import helpers from "./utils/helpers";
import {
    lookup
} from 'mime-types';
import dialogs from "../components/dialogs";
import recents from "./recents";
import fsOperation from "./fileSystem/fsOperation";
import Url from "./utils/Url";

export default createEditorFromURI;
/**
 * 
 * @param {string|fileOptions} uri 
 * @param {boolean} isContentUri 
 * @param {object} data
 */

function createEditorFromURI(uri, isContentUri, data = {}) {
    return new Promise(resolve => {
        let name, location, fileUri, contentUri;

        if (typeof isContentUri === "object")
            data = isContentUri;

        if (typeof uri === 'string') {
            uri = uri;
            name = Url.basename(uri);

            if (!isContentUri) {
                location = Url.dirname(uri);
                fileUri = uri;
            } else {
                contentUri = uri;
            }

        } else {
            name = uri.name;
            fileUri = uri.fileUri;
            contentUri = uri.contentUri;

            if (fileUri) {
                if (!name)
                    name = Url.basename(fileUri);
                location = Url.dirname(fileUri);
            }
        }
        const settings = appSettings.value;
        const {
            cursorPos,
            render,
            index,
            onsave
        } = data;

        let existingFile;

        if (fileUri) existingFile = editorManager.getFile(fileUri, "fileUri");
        else if (contentUri) existingFile = editorManager.getFile(contentUri, "contentUri");

        if (existingFile) {
            editorManager.switchFile(existingFile.id);
            resolve(fileUri);
            return;
        }

        if (data.text) {
            editorManager.addNewFile(name, {
                contentUri,
                fileUri,
                location,
                render,
                text: data.text,
                cursorPos: data.cursorPos,
                isUnsaved: true,
                onsave
            });
            resolve(index === undefined ? fileUri : index);
            return;
        }

        const timeout = setTimeout(() => {
            dialogs.loader.create(strings.loading + "...");
        }, 100);

        fsOperation(fileUri || contentUri)
            .then(fs => {
                return fs.readFile();
            })
            .then(createFile)
            .catch(err => {

                if (fileUri && contentUri) {
                    dialogs.loader.create(strings.loading + '...');
                    return fsOperation(contentUri)
                        .then(fs => {
                            return fs.readFile();
                        })
                        .then(createFile);
                } else {
                    helpers.error(err, fileUri);
                    console.error(err);
                }
            })
            .finally(() => {
                if (timeout) clearTimeout(timeout);
                dialogs.loader.destroy();
                resolve(index === undefined ? fileUri || contentUri : index);
            });

        /**
         * 
         * @param {object} data 
         * @param {ArrayBuffer} res.data 
         */
        function createFile(data) {

            const size = data.byteLength;

            if (size * 0.000001 > settings.maxFileSize) {
                return alert(strings.error.toUpperCase(), `${strings['file too large']} ${settings.maxFileSize}MB`);
            }

            const text = helpers.decodeText(data);

            if (helpers.isBinary(text) && /image/i.test(lookup(name))) {
                const blob = new Blob([data]);
                dialogs.box(name, `<img src='${URL.createObjectURL(blob)}'>`);
                return;
            }

            editorManager.addNewFile(name, {
                fileUri,
                contentUri,
                isContentUri,
                location,
                cursorPos,
                text,
                isUnsaved: false,
                render,
                onsave
            });

            recents.addFile(fileUri);

            resolve(index === undefined ? fileUri : index);
        }
    });
}