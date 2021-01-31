import {CryptoProvider, HexString, _PubKeyCbor, _XPubKey} from '../../types'
import {HARDENED_THRESHOLD} from '../constants'
import {stakingAddressFromXpub, baseAddressFromXpub} from './helpers/addresses'

const shelleyPath = (account: number, isChange: boolean, addrIdx: number) => {
  return [
    HARDENED_THRESHOLD + 1852,
    HARDENED_THRESHOLD + 1815,
    HARDENED_THRESHOLD + account,
    isChange ? 1 : 0,
    addrIdx,
  ]
}

const shelleyStakeAccountPath = (account: number) => {
  return [
    HARDENED_THRESHOLD + 1852,
    HARDENED_THRESHOLD + 1815,
    HARDENED_THRESHOLD + account,
    2, // "staking key chain"
    0,
  ]
}

export const getStakingXpub = async (
  cryptoProvider: CryptoProvider,
  accountIndex: number
): Promise<_XPubKey> => {
  const path = shelleyStakeAccountPath(accountIndex)
  const xpubHex = (await cryptoProvider.deriveXpub(path)).toString('hex')
  return {
    path,
    xpubHex,
  }
}

export const getAccountXpub = async (
  cryptoProvider: CryptoProvider,
  accountIndex: number
): Promise<_XPubKey> => {
  const path = shelleyStakeAccountPath(accountIndex).slice(0, 3)

  const xpubHex: HexString = (await cryptoProvider.deriveXpub(path)).toString('hex')
  return {
    path,
    xpubHex,
  }
}

export const ShelleyStakingAccountProvider = (
  cryptoProvider: CryptoProvider,
  accountIndex: number
) => async () => {
  const pathStake = shelleyStakeAccountPath(accountIndex)
  const stakeXpub = await cryptoProvider.deriveXpub(pathStake)

  return {
    path: pathStake,
    address: stakingAddressFromXpub(stakeXpub, cryptoProvider.network.networkId),
  }
}

export const ShelleyBaseAddressProvider = (
  cryptoProvider: CryptoProvider,
  accountIndex: number,
  isChange: boolean
) => async (i: number) => {
  const pathSpend = shelleyPath(accountIndex, isChange, i)
  const spendXpub = await cryptoProvider.deriveXpub(pathSpend)

  const pathStake = shelleyStakeAccountPath(accountIndex)
  const stakeXpub = await cryptoProvider.deriveXpub(pathStake)

  return {
    path: pathSpend,
    address: baseAddressFromXpub(spendXpub, stakeXpub, cryptoProvider.network.networkId),
  }
}
