import { AuthGuard, AuthGuardVerified } from './auth-guard.service'
import { AuthService } from './auth'

export {
  AuthGuard,
  AuthGuardVerified,
  AuthService
}

export default [
  AuthGuard,
  AuthGuardVerified,
  AuthService
]
