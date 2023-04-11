import { ByteArray, log } from "@graphprotocol/graph-ts"
import {
  GradeMemberAdded,
  CredentialsMemberAdded,
  NoCredentialsMemberAdded
} from "../generated/TestCredentialManager/TestCredentialManager"
import { Member, MerkleTree } from "../generated/schema"
import { concat, hash } from "./utils"

/**
 * Adds a member to a group.
 * @param event Ethereum event emitted when a member is added to a group.
 */
export function addGradeGroupMember(event: GradeMemberAdded): void {
    log.debug(`GradeMemberAdded event block {}`, [event.block.number.toString()])

    const groupId = 3 * (parseInt(event.params.credentialId.toString()) - 1) + 1

    const merkleTree = MerkleTree.load(groupId.toString())

    if (merkleTree) {
        const memberId = hash(
            concat(ByteArray.fromBigInt(event.params.index), ByteArray.fromI32(groupId))
        )
        const member = new Member(memberId)

        log.info("Adding grade member '{}' in the onchain grade group '{}'", [member.id, merkleTree.group])

        member.group = merkleTree.group
        member.identityCommitment = event.params.gradeCommitment
        member.timestamp = event.block.timestamp
        member.index = merkleTree.numberOfLeaves

        member.save()

        merkleTree.root = event.params.gradeTreeRoot
        merkleTree.numberOfLeaves += 1

        merkleTree.save()

        log.info("Grade member '{}' of the onchain grade group '{}' has been added", [member.id, merkleTree.id])
    }
}

export function addCredentialsGroupMember(event: CredentialsMemberAdded) {
    log.debug(`CredentialsMemberAdded event block {}`, [event.block.number.toString()])

    const groupId = 3 * (parseInt(event.params.credentialId.toString()) - 1) + 2

    const merkleTree = MerkleTree.load(event.params.credentialId.toString())

    if (merkleTree) {
        const memberId = hash(
            concat(ByteArray.fromBigInt(event.params.index), ByteArray.fromI32(groupId))
        )
        const member = new Member(memberId)

        log.info("Adding credentials member '{}' in the onchain credentials group '{}'", [member.id, merkleTree.group])

        member.group = merkleTree.group
        member.identityCommitment = event.params.identityCommitment
        member.timestamp = event.block.timestamp
        member.index = merkleTree.numberOfLeaves

        member.save()

        merkleTree.root = event.params.credentialsTreeRoot
        merkleTree.numberOfLeaves += 1

        merkleTree.save()

        log.info("Credentials member '{}' of the onchain credentials group '{}' has been added", [member.id, merkleTree.id])
    }
}

export function addNoCredentialsGroupMember(event: NoCredentialsMemberAdded) {
    log.debug(`NoCredentialsMemberAdded event block {}`, [event.block.number.toString()])

    const groupId = 3 * (parseInt(event.params.credentialId.toString()) - 1) + 3

    const merkleTree = MerkleTree.load(event.params.credentialId.toString())

    if (merkleTree) {
        const memberId = hash(
            concat(ByteArray.fromBigInt(event.params.index), ByteArray.fromI32(groupId))
        )
        const member = new Member(memberId)

        log.info("Adding no-credentials member '{}' in the onchain no-credentials group '{}'", [member.id, merkleTree.group])

        member.group = merkleTree.group
        member.identityCommitment = event.params.identityCommitment
        member.timestamp = event.block.timestamp
        member.index = merkleTree.numberOfLeaves

        member.save()

        merkleTree.root = event.params.noCredentialsTreeRoot
        merkleTree.numberOfLeaves += 1

        merkleTree.save()

        log.info("No-credentials member '{}' of the onchain no-credentials group '{}' has been added", [member.id, merkleTree.id])
    }
}
