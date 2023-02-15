<template>
    <header>
        <section class="logo">
            <img class="logo-img" src="https://trustwallet.com/assets/images/media/assets/trust_platform.svg"
                alt="Logo">
            <h1>Crypto Wallet</h1>
        </section>
        <nav>
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/contact">Contacts</RouterLink>
            <RouterLink to="/statistic">Statistic</RouterLink>
        </nav>

        <span class="dropdown-btn">☰</span>
        <section class="dropdown-options">
            <a href="/">Home</a>
            <a href="/#/contact">Contacts</a>
            <a href="/#/statistic">Statistic</a>
        </section>

    </header>
</template>

<script>
export default {}
</script>
