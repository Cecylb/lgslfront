class Utils {

    static async fetchElements() {
        let elements;
        await fetch('api/editor')
            .then(response => response.json())
            .then(data => elements = data);
        return elements;
    }
}

export default Utils;