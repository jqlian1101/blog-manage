import React from "react";

import SimpleMDE from "simplemde";
import marked from "marked";
import highlight from "highlight.js";
import "simplemde/dist/simplemde.min.css";

export const useMarkd = eleId => {
    const [markInstance, setMarkInstance] = React.useState(null);

    React.useEffect(() => {
        let smde = new SimpleMDE({
            element: document.getElementById(eleId),
            autofocus: true,
            autosave: true,
            previewRender(plainText) {
                return marked(plainText, {
                    renderer: new marked.Renderer(),
                    gfm: true,
                    pedantic: false,
                    sanitize: false,
                    tables: true,
                    breaks: true,
                    smartLists: true,
                    smartypants: true,
                    highlight(code) {
                        return highlight.highlightAuto(code).value;
                    }
                });
            }
        });

        setMarkInstance(smde);
    }, []);

    return { marked: markInstance };
};

export default {
    useMarkd
};
