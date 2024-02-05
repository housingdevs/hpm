import axios from '../../modules/axios';

export function getAtlas() {
    return axios.get('https://api.carpenters.house/mods/hpm/atlas.json').then(response => {
        return response.data;
    }).catch(error => {
        ChatLib.chat('&cAn error occured while loading HPM!')

        if (error.isAxiosError) {
            console.error(error.code + ": " + error.response.data);
        } else {
            console.error(error.message);
        }

        return null
    })
}

export const Atlas = { loaded: false, data: [] }