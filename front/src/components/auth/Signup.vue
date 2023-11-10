<script setup lang="ts">import { ref, computed } from 'vue';
import axios from 'axios';
import { useUserStore } from '../../store/userstore';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

const email = ref('');
const username = ref('');
const password = ref('');

async function signup() {
  const user = {
    email: email.value,
    username: username.value,
    password: password.value,
    selectedDay: selectedDay.value,
    selectedMonth: selectedMonth.value,
    selectedYear: selectedYear.value,
    tosCheckBox: tosCheckBox.value,
  };

  try {
// Enregistrement de l'utilisateur localement (vous devrez peut-être ajuster cette logique)
    
    await userStore.register({username: user.username, password: password.value, email: user.email});

    // Redirection vers la page de connexion
    router.push('/login');
    } catch (error) {
    console.error('Inscription échouée :', error);
    }
    // Envoi des données au backend pour l'envoi de l'e-mail de vérification
    await axios.post('http://localhost:3000/envoyer-email-verification', {
      destinataire: user.email,
    });
}

const selectedDay = ref<string>("");
const selectedMonth = ref<string>("");
const selectedYear = ref<string>("");
const tosCheckBox = ref<Boolean>(false);

const days = [...Array(31).keys()].map((day) => (day + 1).toString());
const months = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre",
];

const years = [...Array(100).keys()].map((year) => (new Date().getFullYear() - year).toString());

const continueDisabled = computed(() => {
  return !(
    email.value &&
    username.value &&
    password.value &&
    selectedDay.value &&
    selectedMonth.value &&
    selectedYear.value &&
    tosCheckBox.value
  );
});
</script>

<template>
  <div class="signup"></div>
  <div class="position body">
    <form class="container">
      <div class="centering-wrapper">
        <div class="section1 text-center">
          <div class="primary-header">Créer un compte</div>
          <div class="input-position">
            <div class="form-group">
              <h5 class="input-placeholder" id="email-txt">
                E-mail <span class="error-message" id="email-error">*</span>
              </h5>
              <input
                type="email"
                required="true"
                name="logemail"
                class="form-style"
                id="logemail"
                autocomplete="off"
                style="margin-bottom: 20px"
                v-model="email"
              />
              <i class="input-icon uil uil-at"></i>
            </div>
            <div class="form-group">
              <h5 class="input-placeholder" id="username-txt">
                Nom d'utilisateur <span class="error-message" id="username-error">*</span>
              </h5>
              <input
                type="text"
                required="true"
                name="username"
                class="form-style"
                id="username"
                autocomplete="off"
                style="margin-bottom: 20px"
                v-model="username"
              />
              <i class="input-icon uil uil-at"></i>
            </div>
            <div class="form-group">
              <h5 class="input-placeholder" id="pword-txt">
                Mot de passe <span class="error-message" id="password-error">*</span>
              </h5>
              <input
                type="password"
                required="true"
                name="logpass"
                class="form-style"
                id="logpass"
                autocomplete="on"
                style="margin-bottom: 20px"
                v-model="password"
              />
              <i class="input-icon uil uil-lock-alt"></i>
            </div>
            <div class="form-group">
              <h5 class="input-placeholder" id="pword-txt">
                Date de naissance <span class="error-message" id="password-error">*</span>
              </h5>
              <div class="birthdate">
                <select class="form-style" id="day" v-model="selectedDay" required label="Jour">
                  <option disabled selected value="">Jour</option>
                  <option v-for="day in days" :value="day">{{ day }}</option>
                </select>

                <select class="form-style" id="month" v-model="selectedMonth" required label="Mois">
                  <option disabled selected value="">Mois</option>
                  <option v-for="month in months" :value="month">{{ month }}</option>
                </select>

                <select class="form-style" id="year" v-model="selectedYear" required label="Année">
                  <option disabled selected value="">Année</option>
                  <option v-for="year in years" :value="year">{{ year }}</option>
                </select>
              </div>
            </div>
          </div>

          <div class="checkbox-container">
            <input type="checkbox" />
            <label class="text-xs text-left" style="color: #a2a3a7">
              (Facultatif) J'accepte volontiers de recevoir des pigeons voyageurs de temps à autre, porteur de nouvelles
              peu interessantes. Tu peux te désinscrire à tout moment, mais pas vraiment en fait.
            </label>
          </div>
          <div class="btn-position">
            <button :class="continueDisabled ? 'btn opacity-50' : 'btn'" @click="signup">Continuer</button>
          </div>
          <div class="checkbox-container">
            <input type="checkbox" v-model="tosCheckBox" />
            <label class="text-xs text-left" style="color: #a2a3a7">
              J'ai lu et accepté les Conditions d'Utilisation et la Politique de Confidentialité de Discord. (on sait
              tous que non)
            </label>
          </div>
          <div class="account-needed"><a href="/login" class="link">Tu as déjà un compte ?</a></div>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

input[type="checkbox"] {
  transform: scale(1.7);
  cursor: pointer;
}

.body {
  font-family: "Open Sans", sans-serif;
  text-rendering: optimizeLegibility;
  user-select: none;
}

::-webkit-scrollbar {
  display: none;
}

.birthdate {
  display: flex;
  justify-content: space-between;

  select {
    width: 30%;
  }
}

.checkbox-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;

  max-width: 30vw;
  margin-top: 20px;
  margin-bottom: 20px;

  input {
    margin-right: 3%;
  }
}

@media (max-width: 1024px) {
  .checkbox-container {
    max-width: 40vw;
  }
}

.signup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-image: url("../../assets/bg_login.png");
  background-repeat: no-repeat;
}
.position {
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: grid;
  place-items: center;
}

.container {
  width: fit-content;
  max-width: 90vw;
  padding: 32px;
  background-color: #2a2b38;
  background: #363940;
  border-radius: 6px;
  left: 0;
  top: 0;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  flex-grow: 1;
  display: grid;
  place-items: center;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
}

.centering-wrapper {
  width: 100%;
  text-align: center;
  margin: 0;
  padding: 0;
  border: 0;
  font-weight: inherit;
  font-style: inherit;
  font-family: inherit;
  font-size: 100%;
  vertical-align: baseline;
  flex: 1 1 auto;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  flex-wrap: nowrap;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: flex;
}

.section1 {
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.primary-header {
  color: #fff;
  font-size: 24px;
  line-height: 30px;
  font-weight: 600;
  margin-bottom: 8px;
}

.secondary-header {
  color: #a2a3a7;
  font-size: 16px;
  line-height: 20px;
}

.account-needed {
  align-self: start;

  color: #a2a3a7;
  font-size: 16px;
  line-height: 20px;
}
.input-position {
  margin-top: 20px;
}

.form-group {
  width: 100%;
  text-align: left;
}

.input-placeholder {
  color: #919296;
  margin-bottom: 8px;
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  text-transform: uppercase;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  cursor: default;

  font-weight: 900;
}

.error-message {
  color: #ec4846;
  font-style: italic;
  text-transform: none;
  font-size: 12px;
  font-weight: 100;
  margin: 0;
  padding: 0;
  border: 0;
  vertical-align: baseline;
  transition: all 0.2s linear;
}

.form-style {
  position: relative;
  padding: 10px;
  height: 40px;
  width: 414px;
  max-width: 80vw;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0.5px;
  color: #c4c3ca;
  background-color: #1e1f22;
  border: 1px solid #282a2e;
  border-radius: 3px;
  outline: none;
  -webkit-transition: all 200ms linear;
  transition: border-color 0.2s ease-in-out;
}

.form-style:hover {
  border-color: #000;
}

.form-style:focus,
.form-style:active {
  border-color: #5864f2;
}

.form-style:active .input-placeholder {
  color: #5864f2;
}

.btn-position {
  width: 100%;
}

.btn {
  text-decoration: none;
  border-radius: 4px;
  height: 44px;
  width: 100%;
  margin-bottom: 10px;
  font-size: 13px;
  font-weight: 500;
  text-transform: capitalize;
  transition: all 200ms linear;
  letter-spacing: 1px;
  display: -webkit-inline-flex;
  display: -ms-inline-flexbox;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: none;
  outline: none;
  background-color: #5864f2;
  color: white;
  cursor: pointer;
}

.btn:hover {
  background-color: #677bc4;
  box-shadow: 0 8px 24px 0 rgba(16, 39, 112, 0.2);
}

.password-container {
  display: block;
  padding-left: 0;
  padding-right: 0;
  margin-bottom: 20px;
  margin-top: 4px;
  width: 100%;
  height: auto;
  padding: 2px 90% 2px 0px;
  position: relative;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  box-sizing: border-box;
  background: none;
  border: none;
  border-radius: 3px;
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
}

.link {
  color: #7289da;
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.7;
  margin: 0 auto;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.link:hover {
  text-decoration: underline;
}

.horizontalSeparator {
  margin: 0 2.5vw;
  border: 1px solid #363940;
}

.qr-login {
  width: 240px;
  height: 344px;
  overflow: hidden;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-box-align: center;
  align-items: center;
  vertical-align: baseline;
}

.qr-container {
  display: flex;
  width: 176px;
  height: 176px;
  border-radius: 2px;
  background: #fff;
  position: relative;
  margin: 30px 0px 32px 0px;
  justify-content: center;
  align-items: center;
}

.logo {
  width: 48px;
  height: 48px;
  position: absolute;
  background-blend-mode: overlay;
}

.qr-code {
  position: absolute;
}

.qr-pheader {
  font-weight: 600;
  margin-bottom: 8px;
  color: #fff;
  font-size: 24px;
  line-height: 30px;
}

.qr-sheader {
  font-size: 16px;
  line-height: 20px;
  color: #a2a3a7;
}

@media only screen and (max-width: 768px) {
  body {
    background-position: 0px 0px;
  }
  svgBlob {
    top: 50;
    left: 0;
    transform: translate(0, -50%);
  }
  .qr-login {
    display: none;
  }
  .horizontalSeparator {
    display: none;
  }
  .container {
    padding: 20px;
  }
}

@keyframes jump {
  0% {
    transform: translateY(0px);
    opacity: 1;
  }
  50% {
    transform: translateY(10px);
  }
  75% {
    opacity: 0.5;
  }
  100% {
    transform: translateY(-70px);
    opacity: 0;
  }
}
</style>
../../store/userStore
