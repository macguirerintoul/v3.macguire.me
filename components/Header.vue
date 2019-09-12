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
          <span class="header-name">Macguire Rintoul</span>
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
          <nuxt-link to="/articles" class="navbar-item hvr-underline-reveal">
            Articles
          </nuxt-link>
          <nuxt-link to="/contact" class="navbar-item">
            <button class="button--primary">Contact</button>
          </nuxt-link>
        </div>
      </div>
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
