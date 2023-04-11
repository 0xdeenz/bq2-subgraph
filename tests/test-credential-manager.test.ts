import { BigInt, ByteArray } from "@graphprotocol/graph-ts"
import {
    assert,
    describe,
    test,
    clearStore,
    beforeAll,
    afterAll
} from "matchstick-as/assembly/index"
import { addGradeGroupMember, addCredentialsGroupMember, addNoCredentialsGroupMember } from "../src/test-credential-manager"
import { concat, hash } from "../src/utils"
import { createCredentialsMemberAddedEvent, createGradeMemberAddedEvent } from "./test-credential-manager-utils"

describe("BlockQualified subgraph", () => {
    afterAll(() => {
        clearStore()
    })

    describe("# addGradeGroupMember", () => {
        test("Should have added a member to the grade group", () => {
            const _credentialId = 350
            const credentialId = BigInt.fromI32(_credentialId)
            const groupId = (3 * (_credentialId - 1) + 1)
            const index = BigInt.fromI32(0)
            const gradeCommitment = BigInt.fromI32(123)
            const gradeTreeRoot = BigInt.fromI32(999)
            const id = hash(concat(ByteArray.fromBigInt(index), ByteArray.fromI32(groupId)))

            const event = createGradeMemberAddedEvent(credentialId, index, gradeCommitment, gradeTreeRoot)

            addGradeGroupMember(event)

            assert.entityCount("Member", 1)

            assert.fieldEquals("Member", id, "index", "0")
            assert.fieldEquals("Member", id, "gradeCommitment", "123")
            assert.fieldEquals("Member", id, "group", groupId.toString())

            assert.fieldEquals("MerkleTree", groupId.toString(), "root", "999")
            assert.fieldEquals("MerkleTree", groupId.toString(), "numberOfLeaves", "1")
        })
    })

    describe("# addCredentialsGroupMember", () => {
        test("Should have added a member to the credentials group", () => {
            const _credentialId = 350
            const credentialId = BigInt.fromI32(_credentialId)
            const groupId = (3 * (_credentialId - 1) + 2)
            const index = BigInt.fromI32(0)
            const identityCommitment = BigInt.fromI32(123)
            const identityTreeRoot = BigInt.fromI32(999)
            const id = hash(concat(ByteArray.fromBigInt(index), ByteArray.fromI32(groupId)))

            const event = createCredentialsMemberAddedEvent(credentialId, index, identityCommitment, identityTreeRoot)

            addCredentialsGroupMember(event)

            assert.entityCount("Member", 1)

            assert.fieldEquals("Member", id, "index", "0")
            assert.fieldEquals("Member", id, "identityCommitment", "123")
            assert.fieldEquals("Member", id, "group", groupId.toString())

            assert.fieldEquals("MerkleTree", groupId.toString(), "root", "999")
            assert.fieldEquals("MerkleTree", groupId.toString(), "numberOfLeaves", "1")
        })
    })

    describe("# addNoCredentialsGroupMember", () => {
        test("Should have added a member to the no-credentials group", () => {
            const _credentialId = 350
            const credentialId = BigInt.fromI32(_credentialId)
            const groupId = (3 * (_credentialId - 1) + 3)
            const index = BigInt.fromI32(0)
            const identityCommitment = BigInt.fromI32(123)
            const identityTreeRoot = BigInt.fromI32(999)
            const id = hash(concat(ByteArray.fromBigInt(index), ByteArray.fromI32(groupId)))

            const event = createCredentialsMemberAddedEvent(credentialId, index, identityCommitment, identityTreeRoot)

            addCredentialsGroupMember(event)

            assert.entityCount("Member", 1)

            assert.fieldEquals("Member", id, "index", "0")
            assert.fieldEquals("Member", id, "identityCommitment", "123")
            assert.fieldEquals("Member", id, "group", groupId.toString())

            assert.fieldEquals("MerkleTree", groupId.toString(), "root", "999")
            assert.fieldEquals("MerkleTree", groupId.toString(), "numberOfLeaves", "1")
        }) 
    })
})
