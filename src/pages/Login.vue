<template>


</template>

<script>
// import FooterComponent from '../components/FooterComponent.vue'
import LoadingAnimationComponent from '../components/LoadingAnimationComponent.vue'

// Firebase関連のインポート
import { signInWithEmailAndPassword } from "firebase/auth";
import Firebase from "../firebase_settings/index.js"
const auth = Firebase.auth

export default {

components: {
    // FooterComponent,
    LoadingAnimationComponent,
},
methods: {
    // Home画面へ遷移
    goToHome() {
        this.$router.push('/')
    },

    // ログイン
    logIn() {
        // IDとパスワードの未入力チェック
        if (this.inputValueId === undefined || this.inputValueId === "" || this.inputValuePassword === undefined || this.inputValuePassword === "") {
            this.errorMessage = 'IDまたはパスワードが未入力です'
            return
        }

        // エラーメッセージの消去
        this.errorMessage = ""

        // ローディングアニメーション
        this.isLoading = true

        // id,passを取得
        const mId = this.inputValueId
        const mPass = this.inputValuePassword

        // 連続クリックを防ぐためにパスワード欄を空欄にする
        this.inputValuePassword = ""

        // サインインメソッド
        signInWithEmailAndPassword(auth, mId, mPass)
            // サインイン成功時
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("ログイン成功 " + user.email)
                this.goToHome()
            })

            // サインイン失敗時
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log('ログインエラー: errorCode -> ' + errorCode + ', errorMessage -> ' + errorMessage)
                this.JudgeErrorCode(errorCode)

                // ローディングアニメーション
                this.isLoading = false
            });
    },

    // FirebaseAuthから受け取ったエラーコードを判定しエラーメッセージを表示する
    JudgeErrorCode(mError) {
        const errorCode = String(mError)
        if (errorCode === 'auth/wrong-password' || errorCode === 'auth/invalid-email' || errorCode === 'auth/user-not-found') {
            this.errorMessage = "ログインに失敗しました。IDまたはパスワードが間違っています"
        } else {
            this.errorMessage = "ログインに失敗しました。予期せぬエラーが発生しました。"
        }
    },
},
data() {
    return {
        // ローディングアニメーション
        isLoading: false,

        // エラーメッセージ
        errorMessage: '',

        // 入力欄
        inputValueId: "",
        inputValuePassword: "",
    }
},
computed: {

},
}

</script>