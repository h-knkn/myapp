import {auth} from '../../firebase/firebase';
import axios from "axios";
import {push, goBack} from 'connected-react-router';
import {
    LogInaction,
    signOutAction
} from "./actions";

const isValidEmailFormat = (email) => {
    const regex = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
    return regex.test(email)
}

export const listenAuthState = () => {
    return async (dispatch) => {
        return auth.onAuthStateChanged(user => {
            if (user) {
                const emailAdress = user.email
                console.log(emailAdress);
                axios
                    .get(`api/userdetail/${emailAdress}`)
                    .then(res => {
                        const data = res.data;
                        console.log(data);

                        dispatch(LogInaction({
                            isSignedIn: true,
                            // role: data.role,
                            name: data.name,
                        }));
                        dispatch(push('/userprofile'));
                    })
            } else {
                dispatch(push('/'))
            }
        })
    }
};


export const signUp = (name, email, password, password_confirmation) => {


    return async (dispatch) => {
        // バリデーション
        if(name === '' || email === ''|| password ==='' || password_confirmation === '') {
            alert('必須項目が未入力です。');
            return false
        }

        if(!isValidEmailFormat(email)) {
            alert('メールアドレスの形式が不正です。もう1度お試しください。')
            return false
        }

        if (password !== password_confirmation) {
            alert('パスワードが一致しません。もう1度お試しください。')
            return false
        }
        if (password.length < 6) {
            alert('パスワードは6文字以上で入力してください。')
            return false
        }

        return auth.createUserWithEmailAndPassword(email, password)
            .then(result => {
                const user = result.user;
                if (user) {
                    const uid = user.uid;

                    const userInitialData = {
                        email: email,
                        uid: uid,
                        name: name,
                        password: password,
                        password_confirmation: password_confirmation
                    };
                        axios
                        .post(`api/register`, userInitialData)
                        .then(res => {
                            console.log(res.data);
                            alert("ユーザー登録が完了しました。ログインしてください。");
                            dispatch(push('/'));
                          
                        //   location.reload();
                        })
                        .catch(err => {
                          alert("登録に失敗しました。");
                        });   
                }
          })
    }
};

export const resetPassword = (email) => {
    return async (dispatch) => {
        if (email === '') {
            alert('メールアドレスを入力してください。')
            return false
        }
        if (!isValidEmailFormat(email)) {
            alert('メールアドレスの形式が不正です。')
            return false
        } else {
            return auth.sendPasswordResetEmail(email)
                .then(() => {
                    alert('入力されたアドレス宛にパスワードリセットのメールをお送りしましたのでご確認ください。')
                    dispatch(push('/'))
                }).catch(() => {
                    alert('登録されていないメールアドレスです。もう一度ご確認ください。')
                })
        }
    }
}

export const LogIn = (email, password) => {
    return async (dispatch) => {
       
        if (email === ''|| password ==='') {
            alert('メールアドレスかパスワードが未入力です。')
            return false
        }
        auth.signInWithEmailAndPassword(email, password)
            .then(result => {
                const userState = result.user
                console.log(userState);

            if (userState) {
                const emailAdress = userState.email
                console.log(emailAdress);
                axios
                    .get(`api/userdetail/${emailAdress}`)
                    .then(res => {
                        const data = res.data;
                        console.log(data);

                        dispatch(LogInaction({
                            isSignedIn: true,
                            // role: data.role,
                            name: "はい",
                        }));
                        dispatch(push('/userprofile'));
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        })
    }  
};


export const singOut = () => {
    return async (dispatch) => {
        auth.signOut()
        .then(() => {
            dispatch(signOutAction());
            dispatch(push('/'))
        })
    }
};
        