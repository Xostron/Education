import webpack from 'webpack'
import path from 'path'

export function buildResolvers():webpack.ResolveOptions{
    return{
        // alias: {
        //     src: path.resolve(__dirname, 'src/') // added this
        //   },
        extensions:[".tsx", ".ts", ".js"],
    }
}