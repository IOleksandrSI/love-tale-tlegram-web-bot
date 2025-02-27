import {ConfigEnv, defineConfig, loadEnv} from 'vite';
import react from '@vitejs/plugin-react'

export default ((config: ConfigEnv) => {
  const { mode } = config;

  process.env = {...process.env, ...loadEnv(mode, process.cwd())};

  return defineConfig({
    plugins: [react()],

    server: {
      host: '0.0.0.0',
      port: Number(process.env.VITE_PORT)
    }
  })
})
