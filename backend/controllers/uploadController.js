exports.uploadFile = (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).send({ message: 'Please upload a file' });
    }

    res.status(200).send({ filePath: `/public/upload/${file.filename}` });
};
