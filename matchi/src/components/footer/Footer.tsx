'use client'

import H3 from '../typography/H3'
import Container from '../container/Container'
import { Divider, Link } from '@nextui-org/react'
import FontAwesome from '../fontAwesome/FontAwesome'
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons'

export default function Footer() {
  return (
    <footer className="bg-black py-8 mt-8">
      <Container className="flex flex-wrap flex-col gap-4 sm:gap-8">
        <div className="flex flex-wrap gap-4 justify-between">
          <div className="flex flex-col gap-3">
            <H3 className="text-white">Mon compte</H3>
            <Link className="text-gray-300 text-sm" href="#">
              Me connecter
            </Link>
            <Link className="text-gray-300 text-sm" href="#">
              Créer un compte
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            <H3 className="text-white">Matchi</H3>
            <Link className="text-gray-300 text-sm" href="#">
              En savoir plus
            </Link>
            <Link className="text-gray-300 text-sm" href="#">
              Applications
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            <H3 className="text-white">Contact</H3>
            <Link className="text-gray-300 text-sm" href="#">
              hello@matchi.tn
            </Link>
            <Link className="text-gray-300 text-sm" href="#">
              14 rue Beffroy 92200 Neuilly-sur-Seine
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            <H3 className="text-white">Suivez nous</H3>
            <div className="flex gap-4">
              <Link className="text-gray-300 text-2xl" href="#">
                <FontAwesome icon={faFacebook} />
              </Link>
              <Link className="text-gray-300 text-2xl" href="#">
                <FontAwesome icon={faInstagram} />
              </Link>
            </div>
          </div>
        </div>
        <Divider className="bg-gray-700" orientation="horizontal" />
        <div className="flex flex-wrap gap-4 sm:gap-8">
          <p className="text-center text-gray-300">©2024 Matchi</p>
          <Link className="text-gray-300 text-sm" href="#">
            Politique de confidentialité
          </Link>
          <Link className="text-gray-300 text-sm" href="#">
            Mentions légales
          </Link>
          <Link className="text-gray-300 text-sm" href="#">
            Utilisation des cookies
          </Link>
          <Link className="text-gray-300 text-sm" href="#">
            Aide
          </Link>
        </div>
      </Container>
    </footer>
  )
}
