<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" variant="dark" static="top">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand to="/">
        <img src="/gym_invert.png" width="32" height="32">
        <span class="pull-left">TREINO SEMPRE</span>
      </b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item to="/treinos" right>
            Treinos
          </b-nav-item>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
