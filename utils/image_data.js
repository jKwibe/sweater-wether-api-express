class ImageData {
    constructor(response) {
        this.urls = response['results'][0]['urls']
        this.user = response['results'][0]['user']
    }
    get parsedData(){
       return {
            id: null,
            type: 'image',
            attributes: {
                creditTo: this.user['name'],
                imageUrl: this.urls['raw']
            }
        }
    }
}

module.exports = ImageData