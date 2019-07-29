<template>
  <header>
    <nav
      :class="{ 'is-active': showMobileMenu }"
      class="navbar"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <nuxt-link class="navbar-item" to="/">
          <span id="logo-text">Macguire Rintoul</span>
        </nuxt-link>

        <a
          role="button"
          class="mobile-menu"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          @click="toggleMobileMenu"
        >
          <span>Menu</span>
        </a>
      </div>

      <div class="navbar-menu" @click="closeMobileMenu">
        <div class="navbar-end">
          <nuxt-link to="/" class="navbar-item hvr-underline-reveal">
            Home
          </nuxt-link>

          <nuxt-link to="/about" class="navbar-item hvr-underline-reveal">
            About
          </nuxt-link>

          <nuxt-link
            to="https://www.linkedin.com/in/mrintoul/"
            class="navbar-item hvr-underline-reveal"
          >
            LinkedIn
          </nuxt-link>

          <a
            href="https://github.com/mrintoul/"
            target="_blank"
            class="navbar-item hvr-underline-reveal"
          >
            GitHub
          </a>

          <nuxt-link to="/contact" class="navbar-item">
            <button>Contact</button>
          </nuxt-link>
        </div>
      </div>
      <!-- link to bulma cdn for debugging -->
      <!-- <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css"
      /> -->
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return { showMobileMenu: false }
  },
  methods: {
    toggleMobileMenu() {
      this.showMobileMenu = !this.showMobileMenu
    },
    closeMobileMenu() {
      this.showMobileMenu = false
    },
  },
}
</script>
