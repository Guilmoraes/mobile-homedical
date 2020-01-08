class Signature {
    static schema = {
        name: 'Signature',
        primaryKey: 'id',
        properties: {
            id: { type: 'string' },
            image: { type: 'File' },
            type: { type: 'string' }
        }
    };
}

export default Signature;
