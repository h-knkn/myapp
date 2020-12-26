import {auth} from '../../firebase/firebase';
import axios from "axios";
import {push, goBack} from 'connected-react-router';
import {
    LogInaction,
} from "./actions";

const isValidEmailFormat = (email) => {
    const regex = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
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
                            name: data.name,
                        }));
                        dispatch(push('/userprofile'));

                    })
                    .catch(err => {
                        console.log(err);
                    });
                }})


    //     const signInUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAA--43PUdsRiahK2Aa5LpXbujGm0qpR9A'
    //     const user = {
    //         email: email,
    //         password: password
    //     }

    //     const getUserInfoUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAA--43PUdsRiahK2Aa5LpXbujGm0qpR9A'

    //     axios.post(signInUrl, user)
    //         .then(response => {
    //           // 返ってきたトークンをローカルストレージに格納する
    //           console.log(response);
    //           localStorage.setItem('token', response.data.idToken);
             
    //           console.log(token);
    //         })
    //         .catch(error => {
    //           alert("ログインに失敗しました。");
    //         })
    //         const access_token = localStorage.getItem('token');
    //         console.log(access_token);


    //     // const token = localStorage.getItem('token');
    //     // const body = {"idToken":token}
    //     // console.log(token);

    //     await axios
    //     .post(getUserInfoUrl, {
    //                 headers: {'Content-Type': 'application/json'}, "idToken":access_token
    //               })
    //             .then(res => {
    //               console.log(res.data);
    //               const data = res.data.users;

               
    //             }).catch(error => {
    //                 alert("ログインに失敗しました。")
    //             })
        
        
    //         if (localStorage.getItem('token')) {
                
    //             alert("ログイン完了");
    //             dispatch(LogInaction({
    //                 isSignedIn: true,
    //                 role: data.role,
    //                 name: data.name,
    //             }));
    //             dispatch(push('/userprofile'));
    //           }
     }
    
};
        