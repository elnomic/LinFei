import { supabase } from './client'

export interface AuthUser {
  id: string
  wallet_address: string
  username?: string
  email?: string
}

export async function signInWithWallet(walletAddress: string): Promise<{
  user: AuthUser | null
  error: Error | null
}> {
  try {
    const { data: existingUser, error: fetchError } = await supabase
      .from('users')
      .select('*')
      .eq('wallet_address', walletAddress)
      .single()

    if (fetchError && fetchError.code !== 'PGRST116') {
      throw fetchError
    }

    let user = existingUser

    if (!user) {
      const { data: newUser, error: createError } = await supabase
        .from('users')
        .insert({
          wallet_address: walletAddress,
          referral_code: generateReferralCode(),
        })
        .select()
        .single()

      if (createError) throw createError
      user = newUser

      await supabase
        .from('trading_accounts')
        .insert({ user_id: user.id })

      await supabase
        .from('points')
        .insert({ user_id: user.id })
    }

    return { user, error: null }
  } catch (error) {
    return { user: null, error: error as Error }
  }
}

function generateReferralCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let code = ''
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

export async function signOut() {
  localStorage.removeItem('linfei_user')
}
