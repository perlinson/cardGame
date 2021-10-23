<template>
  <div class="v-all-field">
    <div class="v-all-field__inner">
      <div class="v-all-field__field">
        <CardField :field="field" />
      </div>
      <div class="v-all-field__graveyard">
        <CardGraveyard :graveyard="graveyard" />
      </div>
      <div class="v-all-field__hand">
        <CardHand :hand="hand" />
      </div>
      <div class="v-all-field__deck">
        <CardDeck :deck="deck" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list1: [
        { name: 'John', id: 1 },
        { name: 'Joao', id: 2 },
        { name: 'Jean', id: 3 },
        { name: 'Gerard', id: 4 },
      ],
      list2: [
        { name: 'Juan', id: 5 },
        { name: 'Edgard', id: 6 },
        { name: 'Johnson', id: 7 },
      ],
      card: {
        w: '',
        h: '',
        name: '',
        type: '',
      },
      field: [
        {
          name: '',
          src: 'https://placehold.jp/150x200.png',
          status: 'none',
          x: '',
          y: '',
          type: '',
          active: false,
        },
      ],
      hand: [
        {
          name: '1',
          src: 'https://placehold.jp/150x200.png',
          status: 'none',
          x: '',
          y: '',
          type: '',
          active: false,
          fn: (name, src, status, x, y, type, active, e) => {
            this.selectCard(name, src, status, x, y, type, active, e)
          },
        },
        {
          name: '2',
          src: 'obelisk.png',
          status: 'none',
          x: '',
          y: '',
          type: '',
          active: false,
          fn: (name, src, status, x, y, type, active, e) => {
            this.selectCard(name, src, status, x, y, type, active, e)
          },
        },
        {
          name: '3',
          src: 'ra.png',
          status: 'none',
          x: '',
          y: '',
          type: '',
          active: false,
          fn: (name, src, status, x, y, type, active, e) => {
            this.selectCard(name, src, status, x, y, type, active, e)
          },
        },
        {
          name: '4',
          src: 'slifer.png',
          status: 'none',
          x: '',
          y: '',
          type: '',
          active: false,
          fn: (name, src, status, x, y, type, active, e) => {
            this.selectCard(name, src, status, x, y, type, active, e)
          },
        },
        {
          name: '5',
          src: 'https://placehold.jp/150x200.png',
          status: 'none',
          x: '',
          y: '',
          type: '',
          active: false,
          fn: (name, src, status, x, y, type, active, e) => {
            this.selectCard(name, src, status, x, y, type, active, e)
          },
        },
      ],
      graveyard: [
        {
          name: '',
          src: 'https://placehold.jp/150x200.png',
          status: 'none',
          x: '',
          y: '',
          type: '',
          active: true,
        },
      ],
      deck: [
        {
          name: '',
          src: 'https://placehold.jp/150x200.png',
          status: 'back',
          x: '',
          y: '',
          type: '',
          active: true,
        },
      ],
    }
  },
  async mounted() {
    this.getCardWY()
    this.setCardWY()
    this.updateCoordinate()
    await new Promise((resolve) => setTimeout(resolve, 1000))
    this.setPosition()
  },
  methods: {
    updateCoordinate() {
      const target = document.getElementsByClassName('c-card')
      const num = target.length
      for (let i = 0; i < num; i++) {
        const x = this.getOffsetLeft(target[i])
        const y = this.getOffsetTop(target[i])
        if (i === 0) {
          this.field[0].x = x
          this.field[0].y = y
        } else if (i === 1) {
          this.graveyard[0].x = x
          this.graveyard[0].y = y
        } else if (i === num - 1) {
          this.deck[0].x = x
          this.deck[0].y = y
        } else {
          this.hand[i - 2].x = x
          this.hand[i - 2].y = y
        }
      }
    },
    getOffsetLeft(item) {
      const left = item.offsetLeft
      const scrollLeft =
        window.pageXOffset || document.documentElement.scrollLeft
      return left + scrollLeft
    },
    getOffsetTop(item) {
      const top = item.getBoundingClientRect().top
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      return top + scrollTop
    },
    getCardWY() {
      const target = document
        .getElementsByClassName('c-deck')[0]
        .getElementsByClassName('c-card-front')[0]
      const w = target.offsetWidth
      const h = target.offsetHeight
      this.card.w = w
      this.card.h = h
    },
    setCardWY() {
      const target = document.getElementsByClassName('c-card-item')
      const num = target.length
      for (let i = 0; i < num; i++) {
        if (i === num - 1) return
        target[i].style.width = this.card.w + 'px'
        target[i].style.height = this.card.h + 'px'
      }
    },
    setPosition() {
      const target = document.getElementsByClassName('c-card-item')
      const num = target.length
      for (let i = 0; i < num; i++) {
        if (i !== 0 && i !== 1 && i !== num - 1) {
          target[i].style.left = this.deck[0].x + 'px'
          target[i].style.position = 'absolute'
        }
      }
      setTimeout(() => {
        this.hand = this.hand.map((item) => {
          const newItem = item
          newItem.status = 'back'
          return newItem
        })
        const target = document.getElementsByClassName('c-card-item')
        const num = target.length
        for (let i = 0; i < num; i++) {
          if (i !== 0 && i !== 1 && i !== num - 1) {
            target[i].style.transition = 'all 1s ease'
            target[i].style.left = this.hand[i - 2].x + 'px'
            target[i].style.position = 'absolute'
          }
        }
      }, 0)
      setTimeout(() => {
        const target = document.getElementsByClassName('c-card-item')
        const num = target.length
        for (let i = 0; i < num; i++) {
          if (i > 1 && i < num - 1) {
            console.log(i)
            target[i].removeAttribute('style')
            target[i].style.width = this.card.w + 'px'
            target[i].style.height = this.card.h + 'px'
          }
        }
        const card = document.getElementsByClassName('c-card')
        const num2 = card.length
        for (let i = 0; i < num2; i++) {
          if (i > 1 && i < num2 - 1) {
            this.hand[i - 2].status = 'flont'
          }
        }
      }, 1000)
    },
    async selectCard(name, src, status, x, y, type, active, e) {
      const result = window.confirm('このカードをフィールドに出しますか？')
      if (result) {
        e.getElementsByClassName('c-card-item')[0].style.transition =
          'all 1s ease'
        e.getElementsByClassName('c-card-item')[0].style.top = y + 'px'
        e.getElementsByClassName('c-card-item')[0].style.left = x + 'px'
        e.getElementsByClassName('c-card-item')[0].style.position = 'absolute'
        await new Promise((resolve) => setTimeout(resolve, 1000))
        e.getElementsByClassName('c-card-item')[0].style.top =
          this.field[0].y + 'px'
        e.getElementsByClassName('c-card-item')[0].style.left =
          this.field[0].x + 'px'
        await new Promise((resolve) => setTimeout(resolve, 1000))
        let hand = this.hand.map((item) => {
          if (item.name === name) {
            return (item = {
              name,
              src: '',
              status: 'none',
              x,
              y,
              type: '',
              active: false,
            })
          } else {
            return item
          }
        })
        this.hand = hand
        this.field = [
          {
            name,
            src,
            status: 'front',
            x: this.field[0].x,
            y: this.field[0].y,
            type: '',
            active: false,
          },
        ]
        await window.alert('戦闘処理')
        const target = document
          .getElementsByClassName('c-card')[0]
          .getElementsByClassName('c-card-item')[0]
        target.style.transition = 'all 1s ease'
        target.style.position = 'absolute'
        target.style.left = this.field[0].x + 'px'
        target.style.top = this.field[0].y + 'px'
        await new Promise((resolve) => setTimeout(resolve, 100))
        target.style.left = this.graveyard[0].x + 'px'
        target.style.top = this.graveyard[0].y + 'px'[0]
        target.style.zIndex = '999'
        e.getElementsByClassName('c-card-item')[0].style.top =
          this.deck[0].y + 'px'
        e.getElementsByClassName('c-card-item')[0].style.left =
          this.deck[0].x + 'px'
        await new Promise((resolve) => setTimeout(resolve, 1000))
        this.graveyard = [
          {
            name: this.field[0].name,
            src: this.field[0].src,
            status: 'front',
            x: this.graveyard[0].x,
            y: this.graveyard[0].y,
            type: '',
            active: false,
          },
        ]
        this.field = [
          {
            name: '',
            src: '',
            status: 'none',
            x: this.field[0].x,
            y: this.field[0].y,
            type: '',
            active: false,
          },
        ]
        target.removeAttribute('style')
        target.style.width = this.card.w + 'px'
        target.style.height = this.card.h + 'px'
        await new Promise((resolve) => setTimeout(resolve, 1000))
        // ifで条件付する
        hand = this.hand.map((item) => {
          if (item.name === name) {
            return (item = {
              name,
              src: 'https://placehold.jp/150x200.png',
              status: 'back',
              x,
              y,
              type,
              active: false,
              fn: (name, src, status, x, y, type, active, e) => {
                this.selectCard(name, src, status, x, y, type, active, e)
              },
            })
          } else {
            return item
          }
        })
        this.hand = hand
        e.getElementsByClassName('c-card-item')[0].style.top = y + 'px'
        e.getElementsByClassName('c-card-item')[0].style.left = x + 'px'
        e.getElementsByClassName('c-card-item')[0].style.zIndex = '999'
        await new Promise((resolve) => setTimeout(resolve, 1000))
        e.getElementsByClassName('c-card-item')[0].removeAttribute('style')
        e.getElementsByClassName('c-card-item')[0].style.width =
          this.card.w + 'px'
        e.getElementsByClassName('c-card-item')[0].style.height =
          this.card.h + 'px'
        hand = this.hand.map((item) => {
          if (item.name === name) {
            return (item = {
              name,
              src: 'https://placehold.jp/150x200.png',
              status: 'front',
              x,
              y,
              type,
              active: false,
              fn: (name, src, status, x, y, type, active, e) => {
                this.selectCard(name, src, status, x, y, type, active, e)
              },
            })
          } else {
            return item
          }
        })
        this.hand = hand
      }
    },
  },
}
</script>

<style lang="sass">
.v-all-field
  width: 100%
  box-sizing: border-box
  &__inner
    width: 100%
    box-sizing: border-box
    display: flex
    flex-wrap: wrap
  &__field
    width: calc(100% / 6 * 5)
    box-sizing: border-box
    display: flex
  &__graveyard
    width: calc(100% / 6)
    box-sizing: border-box
    display: flex
  &__hand
    width: calc(100% / 6 * 5)
    box-sizing: border-box
    display: flex
  &__deck
    width: calc(100% / 6)
    box-sizing: border-box
    display: flex
</style>
