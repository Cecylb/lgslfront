class Utils {

    static async fetchElements() {
        return await fetch('api/editor')
            .then(response => response.json())
            .then(data => {return data});
    }
}

export default Utils;