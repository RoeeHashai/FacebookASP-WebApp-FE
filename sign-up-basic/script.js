document.getElementById('inputPassword').addEventListener('focus', function () {
    document.querySelector('.password-requirements').style.display = 'block';
});

document.getElementById('inputPassword').addEventListener('blur', function () {
    document.querySelector('.password-requirements').style.display = 'none';
});
