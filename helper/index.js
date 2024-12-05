function admin(role) {
    return (req, res, next) => {
        if (req.session.UserRole !== role) {
            const error = "You are not authorized to access this page";
            return res.redirect(`/Post?error=${error}`);
        }
        next();
    };
}
module.exports = admin;