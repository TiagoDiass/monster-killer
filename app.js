function newLog(logClass, logText) {
  return {
    logClass,
    logText,
  };
}

new Vue({
  el: "#app",
  data: () => ({
    running: false,
    playerLife: 0,
    monsterLife: 0,
    logs: [],
  }),

  computed: {
    hasResult() {
      return (this.playerLife == 0 || this.monsterLife == 0) && this.running;
    },
  },

  methods: {
    startGame() {
      this.playerLife = 100;
      this.monsterLife = 100;
      this.logs = [];
      this.running = true;
    },

    attack(special) {
      this.hurt("monsterLife", 5, 10, special);

      if (this.monsterLife > 0) {
        this.hurt("playerLife", 7, 12, false);
      }
    },

    hurt(who, min, max, special) {
      const plus = special ? 5 : 0;
      const damage = this.getRandomNumber(min + plus, max + plus);
      this[who] -= damage;

      let logClass;

      if (special) {
        logClass = "specialLog";
      } else {
        logClass = who == "monsterLife" ? "playerLog" : "monsterLog";
      }

      const attacker = who == "monsterLife" ? "Jogador" : "Monstro";
      const attacked = who == "monsterLife" ? "Monstro" : "Jogador";

      this.logs.unshift(
        newLog(logClass, `O ${attacker} atingiu o ${attacked} com ${damage}`)
      );
    },

    healAndHurt() {
      this.heal(10, 15);
      this.hurt("playerLife", 7, 12, false);
    },

    heal(min, max) {
      const healingAmout = this.getRandomNumber(min, max);
      this.playerLife += healingAmout;
      this.logs.unshift(
        newLog("healLog", `Jogador ganhou uma força de ${healingAmout}`)
      );
    },

    getRandomNumber(min, max) {
      const value = Math.random() * (max - min) + min;
      return Math.round(value);
    },
  },

  watch: {
    hasResult(value) {
      if (value === true) this.logs = [];
    },

    playerLife(value) {
      if (value < 0) this.playerLife = 0;

      if (value > 100) this.playerLife = 100;
    },

    monsterLife(value) {
      if (value < 0) this.monsterLife = 0;
    },
  },
});
