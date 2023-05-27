function adminOnly(req, res, next) {
    if (req.decoded.is_admin === true) {
        next();
    } else {
        return res.status(403).json({
            status: 403,
            success: false,
            message: "Vous n'êtes pas autorisé à accéder à cette ressource."
        });
    }
}

module.exports = adminOnly;