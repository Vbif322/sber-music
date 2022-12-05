import SongModel from '../models/Song.js';

export const getAll = async (req, res) => {
    try {
        const songs = await SongModel.find().populate('user').exec();

        res.json(songs);
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Не удалось получить песни'
        });
    }

}

export const getOne = async (req, res) => {
    try {
        const songId = req.params.id;

        SongModel.findById({
            _id: songId
        },(err, doc)=>{
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: 'Не удалось вернуть песню'
        });
            }

            if (!doc) {
                return res.status(404).json({
                    message: 'Песня не найдена'
        });
            }
            res.json(doc);
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить песню'
        });
    }

}

export const create = async (req, res) => {
    try {
        const doc = new SongModel({
            title: req.body.title,
            author: req.body.author,
            favorite: req.body.favorite,
            imageUrl: req.body.imageUrl,
            user: req.userId,
        });

        const song = await doc.save();

        res.json(song);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось создать песню'
        });
    }

};

export const remove = async (req, res) => {
    try {
        const songId = req.params.id;

        SongModel.findOneAndDelete({
            _id: songId,
        }, (err, doc) =>{
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: 'Не удалось удалить песню'
        });
            }

            if (!doc) {
                return res.status(404).json({
                    message: 'Песня не найдена'
            })
        }

            res.json({
                success: true
            });
        }
        );
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалить песню'
        });
}
}

export const update = async (req, res) => {
    try {
        const songId = req.params.id;

        SongModel.updateOne({
            _id: songId,
        }, {
            title: req.body.title,
            author: req.body.author,
            imageUrl: req.body.imageUrl,
            user: req.userId,
            favorite: req.body.favorite,
        }, (err, doc) =>{
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: 'Не удалось обновить песню'
        });
            }

            if (!doc) {
                return res.status(404).json({
                    message: 'Песня не найдена'
            })
        }

            res.json({
                success: true
            });
        }
        );
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не обновилась песня'
        });
}
}