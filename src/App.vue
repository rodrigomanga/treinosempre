<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a
        class="navbar-brand"
        href="#"
      >
        <img
          src="/gym_invert.png"
          width="32"
          height="32"
          class="d-inline-block align-top"
          alt=""
        >
        TREINO SEMPRE
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div
        class="collapse navbar-collapse"
        id="navbarSupportedContent"
      >
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a
              class="nav-link"
              href="/treinos"
            >Treinos</a>
          </li>
        </ul>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
