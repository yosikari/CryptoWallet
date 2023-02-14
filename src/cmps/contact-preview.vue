<template>
    <article>
        <div class="container">
            <div class="row">
                <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                    <div class="our-team">
                        <div class="picture">
                            <img :src="'https://api.dicebear.com/5.x/open-peeps/svg?seed=' + contact._id" alt="">
                        </div>
                        <div class="team-content">
                            <h2>{{ contact.name }}</h2>
                        </div>
                        <ul class="social">
                            <li><a href="https://codepen.io/collection/XdWJOQ/" class="fa fa-facebook"
                                    aria-hidden="true"></a></li>
                            <li><a href="https://codepen.io/collection/XdWJOQ/" class="fa fa-twitter"
                                    aria-hidden="true"></a></li>
                            <li><a href="https://codepen.io/collection/XdWJOQ/" class="fa fa-google-plus"
                                    aria-hidden="true"></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </article>
</template>

<script>
export default {
    props: {
        contact: {
            type: Object,
            required: true,
        }
    }
}
</script>

<style lang="scss">

</style>
