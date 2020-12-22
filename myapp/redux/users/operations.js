import {auth} from '../../firebase/firebase';
import axios from "axios";
import {push, goBack} from 'connected-react-router';
import {useDispatch} from "react-redux";
import {
    signInAction,
} from "./actions";

const isValidEmailFormat = (email) => {
    const regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    return regex.test(email)
}


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
}
