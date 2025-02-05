import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import { resume, person } from '@/app/resources/content';
import { baseURL } from '@/app/resources';

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontFamily: 'Helvetica',
    },
    section: {
        marginBottom: 20,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subheading: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    text: {
        fontSize: 12,
        marginBottom: 5,
    },
    link: {
        fontSize: 12,
        color: '#0066cc',
        textDecoration: 'none',
        marginBottom: 10,
    },
    experienceHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    achievement: {
        fontSize: 12,
        marginBottom: 3,
        paddingLeft: 15,
    },
    introduction: {
        fontSize: 12,
        marginBottom: 15,
        lineHeight: 1.5,
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 30,
        right: 30,
        fontSize: 8,
        textAlign: 'center',
        color: '#666',
        borderTop: '1 solid #ccc',
        paddingTop: 5,
    },
    newPage: {
        marginBottom: 20,
        breakBefore: 'page',
    },
});

const Footer = () => (
    <View style={styles.footer}>
        <Text>
            PDF generated from {`https://${baseURL}`}
        </Text>
    </View>
);

export const PDFTemplate = () => (
    <Document>
        {/* First Page: Header, Intro, and Work Experience */}
        <Page size="A4" style={styles.page}>
            {/* Header */}
            <View style={styles.section}>
                <Text style={styles.heading}>{person.name}</Text>
                <Text style={styles.text}>{person.role}</Text>
                <Text style={styles.text}>{person.location}</Text>
                <Link style={styles.link} src={`https://${baseURL}`}>
                    {`https://${baseURL}`}
                </Link>
            </View>

            {/* Introduction */}
            {resume.introduction?.content && (
                <View style={styles.section}>
                    <Text style={styles.heading}>Introduction</Text>
                    <Text style={styles.introduction}>{resume.introduction.content}</Text>
                </View>
            )}

            {/* Work Experience */}
            {resume.work?.experiences?.length > 0 && (
                <View style={styles.section}>
                    <Text style={styles.heading}>{resume.work.title || 'Work Experience'}</Text>
                    {resume.work.experiences.map((experience, index) => (
                        <View key={index} style={styles.section}>
                            <View style={styles.experienceHeader}>
                                <Text style={styles.subheading}>{experience.company}</Text>
                                <Text style={styles.text}>{experience.timeframe}</Text>
                            </View>
                            <Text style={styles.text}>{experience.role}</Text>
                            {experience.achievements?.map((achievement, i) => (
                                <Text key={i} style={styles.achievement}>
                                    • {achievement}
                                </Text>
                            ))}
                        </View>
                    ))}
                </View>
            )}
            <Footer />
        </Page>

        {/* Second Page: Education and Technical Skills */}
        <Page size="A4" style={styles.page}>
            {/* Education */}
            {resume.studies?.institutions?.length > 0 && (
                <View style={styles.section}>
                    <Text style={styles.heading}>{resume.studies.title || 'Education'}</Text>
                    {resume.studies.institutions.map((institution, index) => (
                        <View key={index} style={styles.section}>
                            <Text style={styles.subheading}>{institution.name}</Text>
                            <Text style={styles.text}>{institution.description}</Text>
                        </View>
                    ))}
                </View>
            )}

            {/* Technical Skills */}
            {resume.technical?.skills?.length > 0 && (
                <View style={styles.section}>
                    <Text style={styles.heading}>{resume.technical.title || 'Technical Skills'}</Text>
                    {resume.technical.skills.map((skill, index) => (
                        <View key={index} style={styles.section}>
                            <Text style={styles.subheading}>{skill.title}</Text>
                            <Text style={styles.text}>{skill.description}</Text>
                        </View>
                    ))}
                </View>
            )}
            <Footer />
        </Page>
    </Document>
); 