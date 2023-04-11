import {
    assert,
    describe,
    test,
    clearStore,
    beforeAll,
    afterAll
} from "matchstick-as/assembly/index"
import { BigInt } from "@graphprotocol/graph-ts"
import { createCredential } from "../src/credentials-registry"
import { createCredentialCreatedEvent } from "./credentials-registry-utils"
import { TEST_CREDENTIAL_TYPE } from "../src/constants"

describe("BlockQualified subgraph", () => {
    afterAll(() => {
        clearStore()
    })

    test("Should have created the three groups of a credential", () => {
        const _credentialId = 350
        const credentialId = BigInt.fromI32(_credentialId)
        const credentialType = BigInt.fromString(TEST_CREDENTIAL_TYPE)
        const merkleTreeDepth = BigInt.fromI32(20)

        const event1 = createCredentialCreatedEvent(credentialId, credentialType, merkleTreeDepth)

        const gradeGroupId = (3 * (_credentialId - 1) + 1).toString()
        const credentialsGroupId = (3 * (_credentialId - 1) + 2).toString()
        const noCredentialsGroupId = (3 * (_credentialId - 1) + 3).toString()

        createCredential(event1)

        assert.entityCount("Group", 3)
        assert.entityCount("MerkleTree", 1)

        assert.fieldEquals("Group", gradeGroupId, "merkleTree", gradeGroupId)
        assert.fieldEquals("Group", credentialsGroupId, "merkleTree", credentialsGroupId)
        assert.fieldEquals("Group", noCredentialsGroupId, "merkleTree", noCredentialsGroupId)

        assert.fieldEquals("MerkleTree", gradeGroupId, "depth", "20")
        assert.fieldEquals("MerkleTree", credentialsGroupId, "depth", "20")
        assert.fieldEquals("MerkleTree", noCredentialsGroupId, "depth", "20")

        assert.fieldEquals("MerkleTree", gradeGroupId, "group", gradeGroupId)
        assert.fieldEquals("MerkleTree", credentialsGroupId, "group", credentialsGroupId)
        assert.fieldEquals("MerkleTree", noCredentialsGroupId, "group", noCredentialsGroupId)
    })
})
