import ProfileForm from '@/components/ProfileForm'

// import { headers } from 'next/headers'

// function camelCase(obj) {
//   var newObj = {}
//   for (let d in obj) {
//     if (obj.hasOwnProperty(d)) {
//       newObj[
//         d.replace(/(\_\w)/g, function (k) {
//           return k[1].toUpperCase()
//         })
//       ] = obj[d]
//     }
//   }
//   return newObj
// }

export default function Profile() {
  // const account: swell.Account = camelCase(
  //   JSON.parse(
  //     Buffer.from(headers().get('X-Account') || '', 'base64').toString('utf8')
  //   )
  // )

  return <ProfileForm account={undefined} />
}
