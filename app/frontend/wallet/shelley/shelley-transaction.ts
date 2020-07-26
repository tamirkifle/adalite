/* eslint-disable no-use-before-define */
/* eslint-disable camelcase */
import {encode} from 'borc'
import {blake2b} from 'cardano-crypto.js'
import bech32 from './helpers/bech32'

const TxOutputTypeCodes = {
  SIGN_TX_OUTPUT_TYPE_ADDRESS: 1,
  SIGN_TX_OUTPUT_TYPE_PATH: 2,
}

function ShelleyTxAux(inputs, outputs, fee, ttl, certs?) {
  function getId() {
    return blake2b(encode(ShelleyTxAux(inputs, outputs, fee, ttl, certs)), 32).toString('hex')
  }

  function encodeCBOR(encoder) {
    const txMap = new Map()
    txMap.set(0, inputs)
    txMap.set(1, outputs)
    txMap.set(2, fee)
    txMap.set(3, ttl)
    if (certs && certs.length) txMap.set(4, certs)
    return encoder.pushAny(txMap)
  }

  return {
    getId,
    inputs,
    outputs,
    fee,
    ttl,
    certs,
    encodeCBOR,
  }
}

function ShelleyFee(fee) {
  function encodeCBOR(encoder) {
    return encoder.pushAny(fee)
  }

  return {
    fee,
    encodeCBOR,
  }
}

function ShelleyTtl(ttl) {
  function encodeCBOR(encoder) {
    return encoder.pushAny(ttl)
  }

  return {
    ttl,
    encodeCBOR,
  }
}

function ShelleyTxWitnessShelley(publicKey, signature) {
  function encodeCBOR(encoder) {
    return encoder.pushAny([publicKey, signature])
  }

  return {
    publicKey,
    signature,
    encodeCBOR,
  }
}

function ShelleyTxWitnessByron(publicKey, signature, chaincode, address_attributes) {
  function encodeCBOR(encoder) {
    return encoder.pushAny([publicKey, signature, chaincode, address_attributes])
  }

  return {
    publicKey,
    signature,
    chaincode,
    address_attributes,
    encodeCBOR,
  }
}

function ShelleyTxInputFromUtxo(utxo) {
  const coins = utxo.coins // TODO: not needed?
  const txid = utxo.txHash
  const outputNo = utxo.outputIndex
  const address = utxo.address
  const txHash = Buffer.from(txid, 'hex')
  function encodeCBOR(encoder) {
    return encoder.pushAny([txHash, outputNo])
  }

  return {
    coins,
    address,
    txid,
    outputNo,
    encodeCBOR,
  }
}

function ShelleyTxOutput(address, coins, isChange) {
  function encodeCBOR(encoder) {
    const addressBuff = bech32.decode(address).data
    return encoder.pushAny([addressBuff, coins])
  }

  return {
    address,
    coins,
    isChange,
    encodeCBOR,
  }
}

function ShelleyTxCert(type, accountAddress, poolHash) {
  console.log(type, accountAddress, poolHash)
  function encodeCBOR(encoder) {
    const accountAddressHash = bech32.decode(accountAddress).data.slice(1)
    let hash
    if (poolHash) hash = Buffer.from(poolHash, 'hex')
    const account = [0, accountAddressHash]
    const encodedCertsTypes = {
      0: [type, account],
      1: [type, account],
      2: [type, account, hash],
    }
    return encoder.pushAny(encodedCertsTypes[type])
  }

  return {
    type,
    accountAddress,
    poolHash,
    encodeCBOR,
  }
}

function ShelleySignedTransactionStructured(txAux, witnesses, meta) {
  function getId() {
    return txAux.getId()
  }

  function encodeCBOR(encoder) {
    return encoder.pushAny([txAux, witnesses, meta])
  }

  return {
    getId,
    witnesses,
    txAux,
    encodeCBOR,
  }
}

export {
  ShelleyTxAux,
  ShelleyTxWitnessByron,
  ShelleyTxWitnessShelley,
  ShelleyTxOutput,
  ShelleyTxInputFromUtxo,
  ShelleyTxCert,
  ShelleyFee,
  ShelleyTtl,
  ShelleySignedTransactionStructured,
}
