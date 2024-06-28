export function getInitials(name) {
    if (!name) return "";
    const nameParts = name.split(" ");
    const initials =
        nameParts.length > 1
            ? nameParts[0].charAt(0) + nameParts[1].charAt(0)
            : nameParts[0].charAt(0);
    return initials.toUpperCase();
}
