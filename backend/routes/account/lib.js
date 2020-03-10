const userSchema = require("../../models/User");
const passwordHash = require("password-hash");

async function signup(req, res) {
  const { password, email } = req.body;

  if (!email || !password) {
    // Si il n'y a pas d'email ou pas de mot de passe
    return res.status(400).json({
      text: "Requête invalide"
    });
  }

  // Création d'un objet user, dans lequel on hash le mot de passe
  const user = {
    email: email,
    password: passwordHash.generate(password)
  };

  // On check en base si l'utilisateur existe déjà
  try {
    const findUser = await userSchema.findOne({
      email: email
    });

    if (findUser) {
      return res.status(400).json({
        text: "L'utilisateur existe déjà !"
      });
    }
  } catch (error) {
    res.status(500).json({
      error
    });
  }

  // Sauvegarde de l'utilisateur dans la BD
  try {
    const userData = new userSchema(user);
    const userObject = await userData.save();
    return res.status(200).json({
      text: "Utilisateur créé avec succès !",
      token: userObject.getToken()
    });
  } catch (error) {
    res.status(500).json({
      error
    });
  }
}

async function login(req, res) {
  const { password, email } = req.body;

  if (!email || !password) {
    // Si il n'y a pas d'email ou pas de mot de passe
    return res.status(400).json({
      text: "Requête invalide !"
    });
  }

  try {
    // On check si l'utilisateur existe dans la base de données
    const findUser = await userSchema.findOne({ email: email });
    if (!findUser) {
      return res.status(400).json({
        text: "L'utilisateur n'existe pas."
      });
    }

    // On identifie l'utilisateur et on check si le mot de passe est correct
    if (!findUser.authentificate(password)) {
      res.status(401).json({
        text: "Mot de passe incorrect."
      });
    }

    return res.status(200).json({
      text: "Authentification réussie !",
      token: findUser.getToken()
    });
  } catch (error) {
    return res.status(500).json({
      error
    });
  }
}

// On exporte les deux fonctions
exports.login = login;
exports.signup = signup;
