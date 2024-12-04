<template>
    <v-container class="fill-height">
        <v-row justify="center"  no-gutters >
            <v-col cols="6" align-self="center">
                <v-card class="mx-auto">
                    <v-row >
                        <v-col cols="mx-auto" class="d-flex justify-center py-6">
                            <p class="text-sm-h3 font-weight-bold">登入</p>
                        </v-col>
                    </v-row>
                    <v-row >
                        <v-col cols="mx-auto" class="d-flex justify-center py-6">
                            <v-container>
                                <v-form 
                                v-model="form"
                                validate-on="invalid-input lazy"
                                @submit.prevent="logIn"
                            >
                                <v-text-field 
                                    v-model="inputValueId" 
                                    label="Email" 
                                    variant="underlined"
                                    :rules="emailRules"
                                    clearable
                                >
                                    <template v-slot:prepend>
                                        <v-icon icon="mdi-account"></v-icon>
                                    </template>
                                </v-text-field>

                                <v-text-field 
                                    v-model="inputValuePassword" 
                                    :rules="[required]"
                                    :type="show ? 'text' : 'password'"
                                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" 
                                    label="Password"
                                    variant="underlined"
                                    autocomplete="on"
                                    clearable
                                    @click:append="show = !show"
                                >
                                    <template v-slot:prepend>
                                        <v-icon icon="mdi-lock"></v-icon>
                                    </template>
                                </v-text-field>

                                <div class="message">
                                    <p class="text-red">{{ errorMessage }}&nbsp;</p>
                                </div>
                                <div class="loading_animation_container">
                                    <div class="loading_animation" v-if="this.isLoading">
                                        <LoadingAnimationComponent></LoadingAnimationComponent>
                                    </div>
                                </div>
                                <div class="d-flex flex-column">
                                    <!-- :disabled="!form" -->
                                    <v-btn 
                                        :loading="isLoading"
                                        class="mt-4"
                                        color="info" 
                                        size="large"
                                        type="submit"
                                        variant="elevated"
                                        block 
                                    >
                                        登入
                                    </v-btn>
                                </div>
                            </v-form>
                            <!-- ローディングアニメーション -->  
                            </v-container>
                        </v-col>
                    </v-row>
                   

                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
// import FooterComponent from '../components/FooterComponent.vue'
import LoadingAnimationComponent from '../components/LoadingAnimationComponent.vue'

// Firebase関連のインポート
import { signInWithEmailAndPassword } from "firebase/auth";
import Firebase from "../firebase_settings/index.js"
const auth = Firebase.auth

export default {

    data() {
        return {
            form: false,
            show: false,
            // ローディングアニメーション
            isLoading: false,

            // エラーメッセージ
            errorMessage: '',

            // 入力欄
            inputValueId: "",
            inputValuePassword: "",
            emailRules: [
                value => {
                    if (value) return true

                    // return 'E-mail is required.'
                    return 'E-mail 為必要欄位'
                },
                value => {
                    if (/.+@.+\..+/.test(value)) return true

                    return 'E-mail 格式不符'
                },
            ],
        }
    },
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
            //if (!this.form) return

            //IDとパスワードの未入力チェック
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
                    this.setUser(user);
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
                }
                );
        },

        // FirebaseAuthから受け取ったエラーコードを判定しエラーメッセージを表示する
        JudgeErrorCode(mError) {
            const errorCode = String(mError)
            if (errorCode === 'auth/wrong-password' || 
                errorCode === 'auth/invalid-email' ||
                errorCode === 'auth/user-not-found' ||
                errorCode === 'auth/invalid-credential'
            ) {
                this.errorMessage = "ログインに失敗しました。IDまたはパスワードが間違っています"
            } else {
                this.errorMessage = "ログインに失敗しました。予期せぬエラーが発生しました。"
            }
        },
        setUser(user){
            // 將使用者資訊存入 localStorage
            localStorage.setItem("user", JSON.stringify(user));
        },
        required (v) {
        return !!v || '請輸入此欄'
        },
    },

    computed: {

    },
}

</script>