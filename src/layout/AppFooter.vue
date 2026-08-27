<script setup lang="ts">
import { CONTACT, EXTERNAL } from '@/config/destinations'
import { LOGOS } from '@/config/media'
</script>

<template>
  <footer class="footer">
    <div class="footer__inner">
      <div class="footer__brand">
        <div class="footer__logos">
          <img :src="LOGOS.jrg" alt="Juan Román Garza" class="footer__logo-jrg" />
          <span class="footer__logo-x">×</span>
          <img :src="LOGOS.phb" alt="PowerHouse Biotech" class="footer__logo-phb" />
        </div>
        <p class="footer__claim">
          Decisiones inteligentes para tu salud. Simplificadas.
        </p>
        <p class="footer__method">COMPRENDER · DECIDIR · ACTUAR · MEDIR · REGENERAR</p>
      </div>

      <div class="footer__cols">
        <nav class="footer__col">
          <h3>Ecosistema</h3>
          <router-link to="/aprende">Aprende</router-link>
          <a :href="EXTERNAL.evaluacion" target="_blank" rel="noopener">Evalúate — PHB</a>
          <router-link to="/actua">Actúa</router-link>
          <router-link to="/regeneracion">Regeneración</router-link>
        </nav>

        <nav class="footer__col">
          <h3>Trabaja conmigo</h3>
          <router-link to="/conferencias">Conferencias</router-link>
          <router-link to="/empresas">Empresas</router-link>
          <a :href="EXTERNAL.store" target="_blank" rel="noopener">Tienda</a>
        </nav>

        <nav class="footer__col">
          <h3>Contacto</h3>
          <a :href="`mailto:${CONTACT.email}`">
            <i class="fa-solid fa-envelope" aria-hidden="true"></i>
            {{ CONTACT.email }}
          </a>
          <a :href="CONTACT.whatsapp" target="_blank" rel="noopener">
            <i class="fa-brands fa-whatsapp" aria-hidden="true"></i>
            WhatsApp
          </a>
        </nav>
      </div>

      <p class="footer__legal">
        El contenido de este sitio tiene fines educativos e informativos y no sustituye
        una consulta, diagnóstico o tratamiento médico profesional. Toda intervención
        clínica requiere evaluación previa e indicación de un profesional de la salud.
      </p>

      <p class="footer__copy">
        © {{ new Date().getFullYear() }} Juan Román Garza × PowerHouse Biotech. Todos los
        derechos reservados.
      </p>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  border-top: 1px solid $line;
  background: linear-gradient(180deg, $ink 0%, $navy 100%);

  &__inner {
    @include container;
    @include col($sp-6);
    padding-block: $sp-8;
  }

  &__brand {
    @include col($sp-2);
  }

  &__logos {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: $sp-3;
  }

  &__logo-jrg {
    height: 30px;
    width: auto;
  }

  &__logo-x {
    color: rgba($gold, 0.7);
    font-size: 0.8rem;
  }

  &__logo-phb {
    height: 48px;
    width: auto;
    opacity: 0.9;
  }

  &__claim {
    @include body;
  }

  &__method {
    font-family: $font-accent;
    font-size: 0.66rem;
    letter-spacing: 0.16em;
    color: rgba($gold-soft, 0.9);
  }

  &__cols {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: $sp-6;

    > * {
      flex: 1 1 45%;
    }

    @include from($bp-md) {
      > * {
        flex: 1 1 0;
      }
    }
  }

  &__col {
    @include col($sp-2);

    h3 {
      @include eyebrow;
      margin-bottom: $sp-1;
    }

    a {
      display: flex;
      align-items: center;
      gap: $sp-2;
      font-size: 0.9rem;
      color: $muted;
      transition: color 0.18s ease;

      i {
        width: 1rem;
        font-size: 0.85rem;
        color: rgba($gold, 0.8);
      }

      &:hover {
        color: $white;
      }
    }
  }

  &__legal {
    font-size: 0.75rem;
    line-height: 1.6;
    color: rgba($muted, 0.75);
    border-top: 1px solid $line;
    padding-top: $sp-5;
    max-width: 78ch;
  }

  &__copy {
    font-size: 0.75rem;
    color: rgba($muted, 0.6);
  }
}
</style>
