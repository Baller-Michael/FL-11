let email = prompt('Input your email');
let minEmailLength = 6;
let minPasswordLength = 5;

if (email === '' || email === null) {
    alert('Canceled');
} else if (email.length < minEmailLength) {
    alert('I don`t know any users having name length less than 6 symbols');
} else if (email === 'user@gmail.com' || email === 'admin@gmail.com') {
    let password = prompt('Input password');
    if (password === '' || password === null) {
        alert('Canceled');
    } else if (email === 'user@gmail.com' && password === 'UserPass' ||
        email === 'admin@gmail.com' && password === 'AdminPass') {
        let changePassword = confirm('Do you want to change your password?');
        if (changePassword === false) {
            alert('You have failed the change.')
        } else {
            let oldPassword = prompt('Input old password');
            if (oldPassword === '' || oldPassword === null) {
                alert('Canceled');
            } else if (email === 'user@gmail.com' && oldPassword === 'UserPass' ||
                email === 'admin@gmail.com' && oldPassword === 'AdminPass') {
                let newPassword = prompt('Input new password');
                if (newPassword < minPasswordLength) {
                    alert('It’s too short password. Sorry.')
                } else {
                    let repeatNewPassword = prompt('Input again your new password');
                    if (repeatNewPassword === newPassword) {
                        alert('You have successfully changed your password.');
                    } else {
                        alert('You wrote the wrong password.');
                    }
                }
            } else {
                alert('Wrong password');
            }
        }

    } else {
        alert('Wrong password');
    }
} else {
    alert('I don`t know you');
}