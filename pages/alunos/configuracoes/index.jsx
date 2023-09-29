import React from 'react'
import Layout from '../../../components/Layout'
import SalvarImagem from '@/components/elementos/SalvarImagem'


export default function Configuracoes() {
  return (
    <Layout>
    <div>
      <p>Configurações</p>
    <SalvarImagem/>
    </div>
    </Layout>
  )
}
Configuracoes.auth = true