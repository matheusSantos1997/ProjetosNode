exports.defaultPageTitle = "Site";

exports.menu = [
    { name: 'Home', slug: '/', guest: true, logged: true },
    { name: 'Login', slug: '/users/login', guest: true, logged: false },
    { name: 'Cadastro', slug: '/users/register', guest: true, logged: false},
    { name: 'Adicionar Post', slug: '/posts/add', guest: true, logged: true },
    { name: 'Sair', slug: '/users/logout', guest: false, logged: true }
];