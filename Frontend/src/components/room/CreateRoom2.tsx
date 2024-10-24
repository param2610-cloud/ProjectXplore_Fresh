// Types for Room Creation
interface RoomCreationRequest {
    name: string;
    description: string;
    accessType: "public" | "private" | "team-only";
    createdBy: string;
    projectCategory?: string;
    maxTeamSize?: number;
}

interface ValidationError {
    field: string;
    message: string;
}

// Constants for validation
const VALIDATION_RULES = {
    NAME: {
        MIN_LENGTH: 3,
        MAX_LENGTH: 50,
        PATTERN: /^[a-zA-Z0-9-_\s]+$/,
    },
    DESCRIPTION: {
        MIN_LENGTH: 10,
        MAX_LENGTH: 500,
    },
    TEAM: {
        MIN_SIZE: 1,
        MAX_SIZE: 10,
    },
};

// Room validation function
async function validateRoomCreation(
    data: RoomCreationRequest
): Promise<ValidationError[]> {
    const errors: ValidationError[] = [];

    // Name validation
    if (!data.name) {
        errors.push({ field: "name", message: "Room name is required" });
    } else {
        if (data.name.length < VALIDATION_RULES.NAME.MIN_LENGTH) {
            errors.push({
                field: "name",
                message: `Room name must be at least ${VALIDATION_RULES.NAME.MIN_LENGTH} characters`,
            });
        }
        if (data.name.length > VALIDATION_RULES.NAME.MAX_LENGTH) {
            errors.push({
                field: "name",
                message: `Room name cannot exceed ${VALIDATION_RULES.NAME.MAX_LENGTH} characters`,
            });
        }
        if (!VALIDATION_RULES.NAME.PATTERN.test(data.name)) {
            errors.push({
                field: "name",
                message:
                    "Room name can only contain letters, numbers, spaces, hyphens, and underscores",
            });
        }

        // Check for unique room name (assuming you have a database function)
        const isNameTaken = await checkRoomNameExists(data.name.toLowerCase());
        if (isNameTaken) {
            errors.push({ field: "name", message: "Room name already exists" });
        }
    }

    // Description validation
    if (!data.description) {
        errors.push({
            field: "description",
            message: "Description is required",
        });
    } else {
        if (data.description.length < VALIDATION_RULES.DESCRIPTION.MIN_LENGTH) {
            errors.push({
                field: "description",
                message: `Description must be at least ${VALIDATION_RULES.DESCRIPTION.MIN_LENGTH} characters`,
            });
        }
        if (data.description.length > VALIDATION_RULES.DESCRIPTION.MAX_LENGTH) {
            errors.push({
                field: "description",
                message: `Description cannot exceed ${VALIDATION_RULES.DESCRIPTION.MAX_LENGTH} characters`,
            });
        }
    }

    // Access type validation
    if (!["public", "private", "team-only"].includes(data.accessType)) {
        errors.push({
            field: "accessType",
            message:
                "Invalid access type. Must be public, private, or team-only",
        });
    }

    // Team size validation for team-only rooms
    if (data.accessType === "team-only") {
        if (!data.maxTeamSize) {
            errors.push({
                field: "maxTeamSize",
                message: "Maximum team size is required for team rooms",
            });
        } else if (
            data.maxTeamSize < VALIDATION_RULES.TEAM.MIN_SIZE ||
            data.maxTeamSize > VALIDATION_RULES.TEAM.MAX_SIZE
        ) {
            errors.push({
                field: "maxTeamSize",
                message: `Team size must be between ${VALIDATION_RULES.TEAM.MIN_SIZE} and ${VALIDATION_RULES.TEAM.MAX_SIZE}`,
            });
        }
    }

    return errors;
}

// Helper function to check if room name exists
async function checkRoomNameExists(name: string): Promise<boolean> {
    // Implement your database query here
    // Return true if name exists, false otherwise
    return false;
}

// Example usage
async function createRoom(roomData: RoomCreationRequest) {
    try {
        const validationErrors = await validateRoomCreation(roomData);

        if (validationErrors.length > 0) {
            return {
                success: false,
                errors: validationErrors,
            };
        }

        // If validation passes, create the room
        const room = {
            ...roomData,
            createdAt: new Date(),
            status: "active",
            members: [roomData.createdBy], // Creator is first member
            ideaSubmitted: false,
        };

        // Save room to database
        // const savedRoom = await saveRoom(room);

        return {
            success: true,
            data: room,
        };
    } catch (error) {
        return {
            success: false,
            errors: [{ field: "general", message: "Failed to create room" }],
        };
    }
}
