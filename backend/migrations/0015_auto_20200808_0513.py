# Generated by Django 2.2.10 on 2020-08-08 02:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0014_auto_20200808_0510'),
    ]

    operations = [
        migrations.AlterField(
            model_name='projectchecklist',
            name='executor_task',
            field=models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.CASCADE, to='backend.User'),
        ),
    ]
