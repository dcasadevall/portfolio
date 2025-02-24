import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import { resume, person } from '@/app/resources/content';
import { baseURL } from '@/app/resources';
import React from 'react';

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontFamily: 'Helvetica',
        backgroundColor: '#ffffff',
    },
    section: {
        marginBottom: 15,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#1a1a1a',
    },
    subheading: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#2563eb', // blue-600
    },
    text: {
        fontSize: 12,
        marginBottom: 5,
        color: '#4b5563', // gray-600
        lineHeight: 1.5,
    },
    link: {
        fontSize: 12,
        color: '#2563eb',
        textDecoration: 'none',
        marginBottom: 10,
    },
    highlight: {
        color: '#2563eb',
        fontWeight: 'bold',
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
        color: '#4b5563',
        lineHeight: 1.5,
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
    headerSection: {
        marginBottom: 15,
        alignItems: 'center',
    },
    headerName: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 4,
        color: '#1a1a1a',
    },
    roleText: {
        fontSize: 16,
        color: '#4b5563',
        marginBottom: 4,
    },
    headerLink: {
        fontSize: 14,
        color: '#2563eb',
        textDecoration: 'none',
    },
});

const Footer = () => (
    <View style={styles.footer}>
        <Text>
            PDF generated from {`https://${baseURL}`}
        </Text>
    </View>
);

interface PDFTemplateProps extends React.ComponentProps<typeof Document> {
    person: typeof person;
    resume: typeof resume;
}

const stripHtml = (content: string | React.ReactElement) => {
    if (typeof content === 'string') {
        // Replace highlight spans with special markers
        const withHighlights = content.replace(
            /<span[^>]*className="highlight"[^>]*>(.*?)<\/span>/g,
            '{{highlight}}$1{{/highlight}}'
        );
        // Remove other HTML tags
        const withoutOtherTags = withHighlights.replace(/<[^>]*>/g, '');
        // Convert back to Text components with styles
        return withoutOtherTags.split(/(\{\{highlight\}\}.*?\{\{\/highlight\}\})/g)
            .map(part => {
                const highlightMatch = part.match(/\{\{highlight\}\}(.*?)\{\{\/highlight\}\}/);
                if (highlightMatch) {
                    return <Text style={styles.highlight}>{highlightMatch[1]}</Text>;
                }
                return part;
            });
    }

    // Handle React elements
    if (React.isValidElement(content)) {
        const element = content as React.ReactElement<{ children: React.ReactNode }>;
        if (typeof element.props.children === 'string') {
            return element.props.children;
        }
        if (Array.isArray(element.props.children)) {
            return element.props.children
                .map(child => stripHtml(child))
                .join('');
        }
    }

    return String(content);
};

export const PDFTemplate: React.FC<PDFTemplateProps> = ({ person, resume, ...props }) => (
    <Document {...props}>
        <Page size="A4" style={styles.page}>
            {/* Header */}
            <View style={styles.section}>
                <View style={styles.headerSection}>
                    <Text style={styles.headerName}>{person.name}</Text>
                    <Text style={styles.roleText}>{person.role}</Text>
                    <Link style={styles.headerLink} src={`https://${baseURL}`}>
                        {`https://${baseURL}`}
                    </Link>
                </View>
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
                                    • {stripHtml(achievement)}
                                </Text>
                            ))}
                        </View>
                    ))}
                </View>
            )}

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
                            <Text style={styles.subheading}>{stripHtml(skill.title)}</Text>
                            <Text style={styles.text}>{stripHtml(skill.description)}</Text>
                        </View>
                    ))}
                </View>
            )}
            <Footer />
        </Page>
    </Document>
); 