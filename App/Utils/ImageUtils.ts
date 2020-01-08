class ImageUtils {
    mapImageType = (fileName?: string) => {
        if (fileName === undefined || fileName === null) {
            return undefined;
        }

        if (fileName.search(new RegExp('.jpg', 'i')) || fileName.search(new RegExp('.jpeg', 'i'))) {
            return 'image/jpeg';
        } else if (fileName.search(new RegExp('.png', 'i'))) {
            return 'image/png';
        } else if (fileName.search(new RegExp('.gif', 'i'))) {
            return 'image/gif';
        }
        return undefined;
    };
}

export default new ImageUtils();
