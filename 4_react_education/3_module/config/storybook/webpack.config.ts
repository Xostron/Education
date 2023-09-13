import  webpack  from 'webpack';
import { BuildPath } from '../build/types/config';
import path from 'path';

export default ({config}:{config:webpack.Configuration})=>{
    const paths:BuildPath={
        build:'',
        html:'',
        entry:'',
        src:path.resolve(__dirname, '..', '..', 'src')
    }
    config.resolve?.modules?.push(paths.src)
    config.resolve?.extensions?.push('.ts', '.tsx')
    return config
}