// Libs
import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

// Local imports
import * as enText from "./en";
import * as itText from "./it";
import * as deText from "./de";
import * as frText from "./fr";

const text = {
    EN: { ...enText },
    IT: { ...itText },
    DE: { ...deText },
    FR: { ...frText }
}

const initialState = {
    selectedLanguageKey: "EN",
    text: text["EN"]
}

const i18nSlice = createSlice({
    name: "i18n",
    initialState: initialState,
    reducers: {
        languageChangedByKey: (state, action) => {
            const { key } = action.payload;
            state.selectedLanguageKey = key;
            state.text = text[key]
        }
    }
});

const { languageChangedByKey } = i18nSlice.actions;

const useSelectLanguage = () => {
    const selectedLanguageKey = useSelector(state => state.i18n.selectedLanguageKey);
    return selectedLanguageKey;
}

const useSelectText = () => {
    const text = useSelector(state => state.i18n.text);
    return text;
}

export default i18nSlice;
export {
    languageChangedByKey,
    useSelectLanguage,
    useSelectText
}
