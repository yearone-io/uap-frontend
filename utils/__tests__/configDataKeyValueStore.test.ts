import { describe, it, expect } from 'vitest'
import { 
  encodeBoolValue,
  decodeExecDataValue,
  customEncodeAddresses,
  customDecodeAddresses,
  getMissingPermissions
} from '../configDataKeyValueStore'

describe('configDataKeyValueStore', () => {

  describe('encodeBoolValue', () => {
    it('should encode true as 0x01', () => {
      expect(encodeBoolValue(true)).toBe('0x01')
    })

    it('should encode false as 0x00', () => {
      expect(encodeBoolValue(false)).toBe('0x00')
    })
  })

  describe('decodeExecDataValue', () => {
    it('should decode valid exec data value', () => {
      // Mock data: assistant address + config data (tip address + amount)
      const execDataValue = '0x8b80c84b9cd9eb087e6894997ae161d4f9d975b9000000000000000000000000cc8dcfe12590ba2310fd557ef6a1da94fa3a18470000000000000000000000000000000000000000000000000000000000000001'
      
      const [address, configBytes] = decodeExecDataValue(execDataValue)
      
      expect(address).toBe('0x8b80c84B9Cd9EB087E6894997AE161d4f9d975b9')
      expect(configBytes).toBe('0x000000000000000000000000cc8dcfe12590ba2310fd557ef6a1da94fa3a18470000000000000000000000000000000000000000000000000000000000000001')
    })

    it('should handle data without 0x prefix', () => {
      const execDataValue = '8b80c84b9cd9eb087e6894997ae161d4f9d975b9000000000000000000000000cc8dcfe12590ba2310fd557ef6a1da94fa3a1847'
      
      const [address, configBytes] = decodeExecDataValue(execDataValue)
      
      expect(address).toBe('0x8b80c84B9Cd9EB087E6894997AE161d4f9d975b9')
      expect(configBytes).toBe('0x000000000000000000000000cc8dcfe12590ba2310fd557ef6a1da94fa3a1847')
    })

    it('should throw error for data too short', () => {
      expect(() => decodeExecDataValue('0x123')).toThrow('Invalid encoded data: too short')
      expect(() => decodeExecDataValue('0x8b80c84b9cd9eb087e6894997ae161d4f9d975')).toThrow('Invalid encoded data: too short')
    })

    it('should handle minimum valid length (address only)', () => {
      const execDataValue = '0x8b80c84b9cd9eb087e6894997ae161d4f9d975b9'
      
      const [address, configBytes] = decodeExecDataValue(execDataValue)
      
      expect(address).toBe('0x8b80c84B9Cd9EB087E6894997AE161d4f9d975b9')
      expect(configBytes).toBe('0x')
    })
  })

  describe('customEncodeAddresses', () => {
    it('should encode empty array', () => {
      expect(customEncodeAddresses([])).toBe('0x')
    })

    it('should encode single address', () => {
      const addresses = ['0x8b80c84b9cd9eb087e6894997ae161d4f9d975b9']
      const result = customEncodeAddresses(addresses)
      
      expect(result).toBe('0x00018b80c84b9cd9eb087e6894997ae161d4f9d975b9')
    })

    it('should encode multiple addresses', () => {
      const addresses = [
        '0x8b80c84b9cd9eb087e6894997ae161d4f9d975b9',
        '0xcc8dcfe12590ba2310fd557ef6a1da94fa3a1847'
      ]
      const result = customEncodeAddresses(addresses)
      
      expect(result).toBe('0x00028b80c84b9cd9eb087e6894997ae161d4f9d975b9cc8dcfe12590ba2310fd557ef6a1da94fa3a1847')
    })

    it('should throw error for too many addresses', () => {
      const addresses = new Array(65536).fill('0x8b80c84b9cd9eb087e6894997ae161d4f9d975b9')
      expect(() => customEncodeAddresses(addresses)).toThrow('Number of addresses exceeds uint16 capacity.')
    })
  })

  describe('customDecodeAddresses', () => {
    it('should decode empty array', () => {
      expect(customDecodeAddresses('0x')).toEqual([])
    })

    it('should decode single address', () => {
      const encoded = '0x00018b80c84b9cd9eb087e6894997ae161d4f9d975b9'
      const result = customDecodeAddresses(encoded)
      
      expect(result).toEqual(['0x8b80c84B9Cd9EB087E6894997AE161d4f9d975b9'])
    })

    it('should decode multiple addresses', () => {
      const encoded = '0x00028b80c84b9cd9eb087e6894997ae161d4f9d975b9cc8dcfe12590ba2310fd557ef6a1da94fa3a1847'
      const result = customDecodeAddresses(encoded)
      
      expect(result).toEqual([
        '0x8b80c84B9Cd9EB087E6894997AE161d4f9d975b9',
        '0xcc8Dcfe12590BA2310FD557Ef6A1dA94fa3A1847'
      ])
    })

    it('should handle decode errors gracefully', () => {
      // Test with legacy format '0x0000' - function should still return empty array
      const result = customDecodeAddresses('0x0000')
      expect(result).toEqual([])
      
      // Test with invalid hex data that will cause ethers.getAddress to throw
      expect(() => customDecodeAddresses('0x0001invalidhexdatainvalidhexdatainvalidhex')).toThrow()
    })
  })


  describe('getMissingPermissions', () => {
    it('should return empty array when no missing permissions', () => {
      const current = { SETDATA: true, CALL: true }
      const required = { SETDATA: true, CALL: true }
      
      expect(getMissingPermissions(current, required)).toEqual([])
    })

    it('should return missing permissions as array', () => {
      const current = { SETDATA: true }
      const required = { SETDATA: true, CALL: true, SUPER_SETDATA: true }
      
      const result = getMissingPermissions(current, required)
      expect(result).toEqual(['CALL', 'SUPER_SETDATA'])
    })

    it('should handle false values in current permissions', () => {
      const current = { SETDATA: false, CALL: true }
      const required = { SETDATA: true, CALL: true }
      
      const result = getMissingPermissions(current, required)
      expect(result).toEqual(['SETDATA'])
    })
  })
})