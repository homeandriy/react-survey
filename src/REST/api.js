import {dummyData} from "./dummyData";

export const api = Object.freeze({
    get : () => {
        return dummyData;
    },
    send : () => {
        return true;
    }

})