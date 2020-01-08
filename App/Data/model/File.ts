class File {
    static schema = {
        name: 'File',
        primaryKey: 'id',
        properties: {
            id: { type: 'string' },
            fileName: { type: 'string', optional: true },
            fileMobilePath: { type: 'string', optional: true },
            url: { type: 'string', optional: true },
            fileContentType: { type: 'string', optional: true }
        }
    };
}

export default File;
